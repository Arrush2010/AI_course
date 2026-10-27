import streamlit as st
st.set_page_config(page_title="Study Buddy");st.title("Study Buddy — Mock Mode")
st.warning("This is simulated teaching output, not a live AI model.")
topic=st.text_input("Topic");level=st.selectbox("Level",["Beginner","Intermediate","Advanced"]);mode=st.radio("Mode",["Explain","Practice questions","Hint"])
if st.button("Generate"):
 if not topic.strip():st.error("Enter a topic.")
 elif mode=="Explain":st.write(f"{level} sample: {topic.strip()} is your topic. Break it into smaller ideas, define terms and practise with a small example.")
 elif mode=="Practice questions":st.write("1. Explain the main idea. 2. Give an example. 3. Describe a common mistake.")
 else:st.write("Hint: identify key terms and create the smallest possible example.")
 st.caption("Mock output only. Verify important facts using trusted learning materials.")
