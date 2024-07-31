const {zerox} = require('./index');

(async()=>{
   await zerox({
        filePath: "https://api.test.awardedai.dev/storage/v1/object/sign/user-data/shared/Basit_Testing/Psci_website.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1c2VyLWRhdGEvc2hhcmVkL0Jhc2l0X1Rlc3RpbmcvUHNjaV93ZWJzaXRlLnBkZiIsImlhdCI6MTcyMjM5NDgxMywiZXhwIjoxNzIyNDgxMjEzfQ.eKnsnjR6QBqr6unBrdQwmlps37ojd8LJTaA-MUdY_eU",
        openaiAPIKey:process.env.OPENAI_API_KEY,
      })
})()