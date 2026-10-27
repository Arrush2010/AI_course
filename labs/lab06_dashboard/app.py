from pathlib import Path
import pandas as pd
import streamlit as st
import plotly.express as px
st.set_page_config(page_title="Sales Explorer",layout="wide")
st.title("Sales Explorer");st.caption("Fictional teaching data.")
p=Path(__file__).with_name("sales.csv")
required={"transaction_id","date","product","region","quantity","unit_price","sales_amount"}
try:
 d=pd.read_csv(p)
 if required-set(d.columns):st.error("CSV is missing required columns.");st.stop()
 d["date"]=pd.to_datetime(d["date"],errors="coerce")
 for c in ["quantity","unit_price","sales_amount"]:d[c]=pd.to_numeric(d[c],errors="coerce")
 bad=d[list(required)].isna().any(axis=1)
 if bad.any():st.warning(f"Skipping {int(bad.sum())} invalid row(s).");d=d.loc[~bad].copy()
 if d.empty:st.info("No valid rows.");st.stop()
except (OSError,pd.errors.ParserError) as e:st.error(f"Could not load CSV: {e}");st.stop()
regions=st.multiselect("Region",sorted(d.region.unique()),default=sorted(d.region.unique()))
products=st.multiselect("Product",sorted(d.product.unique()),default=sorted(d.product.unique()))
f=d[d.region.isin(regions)&d.product.isin(products)].copy()
a,b,c=st.columns(3);a.metric("Sales",f"${f.sales_amount.sum():,.2f}");b.metric("Transactions",len(f));c.metric("Average",f"${f.sales_amount.mean():,.2f}" if len(f) else "$0.00")
if f.empty:st.info("No rows match filters.")
else:
 f["month"]=f.date.dt.to_period("M").astype(str)
 st.plotly_chart(px.line(f.groupby("month",as_index=False).sales_amount.sum(),x="month",y="sales_amount",title="Monthly sales"),use_container_width=True)
 st.plotly_chart(px.bar(f.groupby("product",as_index=False).sales_amount.sum(),x="product",y="sales_amount",title="Sales by product"),use_container_width=True)
st.dataframe(f,use_container_width=True);st.download_button("Download filtered CSV",f.to_csv(index=False).encode(),file_name="filtered_sales.csv",mime="text/csv")
