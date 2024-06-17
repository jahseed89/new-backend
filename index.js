const express = require('express')
require("dotenv").config();
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

// ************ Implenting A Post request ***********
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

let notes = [
     {
      id: 1,
      content: "HTML is easy to learn",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]

app.get('/', (request, response) => {
  response.send('Hello World')
})

// ******* Get All Notes ***********
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

// ******* Fetching a single route ***********
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
  // // ****** If url exist status 
    if (note) {
      response.json(note)
    } else {
      response.status(404).end('Page Not Found')
    }
  })

//   ******** Deleting request ********
// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)
  
//     response.status(204).end()
//   })

// ******** Port runing on *************
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})