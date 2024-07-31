const {zerox} = require('./index');

(async()=>{
   await zerox({
        filePath: "https://sedl.org/afterschool/toolkits/science/pdf/ast_sci_data_tables_sample.pdf",
        openaiAPIKey:process.env.OPENAI_API_KEY,
      })
})()