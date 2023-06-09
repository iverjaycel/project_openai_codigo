# Openai_codigo 
website url: https://codigo-wine.vercel.app/

## Openai Codigo is an AI built to help students and developers in QDD. QDD stands for "Question Driven Development" 
Question driven development is a software development methodology that focuses on asking questions to identify and solve problems. It is based on the idea that the best way to understand a problem is to ask questions about it. This approach encourages developers to think critically and creatively about the problem at hand, and to come up with innovative solutions. The goal of question driven development is to create software that meets user needs in an efficient and effective manner.

 
![image](https://user-images.githubusercontent.com/53965169/229686566-66f5ff1b-35fb-45eb-aa55-e9eaee7f8675.png)

# Onrender for the server side 
![image](https://user-images.githubusercontent.com/53965169/229687359-50afc707-a7e3-4ff6-8963-801a7f78616e.png)
``` javascript 
/*
making a POST request to the URL 'https://codigo.onrender.com/' with a body containing a JSON object. The JSON object
contains a key-value pair, with the key being 'prompt' and the value being the data from the 'data' variable
*/
    const response = await fetch('https://codigo.onrender.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })
```
# Vercel for the front end  
![image](https://user-images.githubusercontent.com/53965169/229688250-5d41388a-af81-48c9-a190-3602046b0c11.png)
