import axios from "axios";


export function getTextStats(htmlContent) {
    // Remove HTML tags to get plain text
    const plainText = htmlContent.replace(/<[^>]*>/g, '');

    // Calculate word count
    const words = plainText.trim().split(/\s+/);
    const wordCount = words.length;

    // Calculate character count
    const charCount = plainText.length;

    return {
        wordCount,
        charCount
    };
}


export async function LoginUser(body) {
    try {
        let res = await axios.post('http://localhost:5000/users/login', body, {
            withCredentials: true
        })
        return res
    } catch (error) {
        return error.response
    }
}

export async function RegisterUser(body) {
    try {
        let res = await axios.post('http://localhost:5000/users/register', body, {
            withCredentials: true
        })
        return res
    } catch (error) {
        return error.response
    }
}
export async function SignOutUser() {
    try {
        let res = await axios.post('http://localhost:5000/users/logout', {}, {
            withCredentials: true
        })
        return res
    } catch (error) {
        return error.response
    }
}




// Function to add a new note
export function addNoteLocal(note) {
    // Generate a unique ID for the note
    // const tempId = Date.now().toString();
    // note.id = tempId;
    note.date = new Date().toISOString();

    // Retrieve existing notes from local storage
    let guestNotes = JSON.parse(localStorage.getItem('guestNotes')) || [];

    // Add the new note to the array of notes
    guestNotes.push(note);

    // Save the updated array of notes back to local storage
    localStorage.setItem('guestNotes', JSON.stringify(guestNotes));
}

// Function to retrieve all notes
export function getNotesLocal() {
    // Retrieve notes from local storage
    return JSON.parse(localStorage.getItem('guestNotes')) || [];
}

// Function to update a note
export function updateNoteLocal(updatedNote) {
    // Retrieve existing notes from local storage
    let guestNotes = JSON.parse(localStorage.getItem('guestNotes')) || [];


    // Find the index of the note to be updated
    const index = guestNotes.findIndex(note => note.id == updatedNote.id);

    // If the note is found, update it
    if (index !== -1) {
        updatedNote.date = new Date().toISOString();
        guestNotes[index] = updatedNote;

        // Save the updated array of notes back to local storage
        localStorage.setItem('guestNotes', JSON.stringify(guestNotes));
    }
}

// Function to delete a note
export function deleteNoteLocal(id) {
    // Retrieve existing notes from local storage
    let guestNotes = JSON.parse(localStorage.getItem('guestNotes')) || [];

    // Filter out the note with the specified ID
    guestNotes = guestNotes.filter(note => note.id !== id);

    // Save the updated array of notes back to local storage
    localStorage.setItem('guestNotes', JSON.stringify(guestNotes));
}





// async function getUserFromBackend() {
//     try {
//         // const res = await axios.get('http://localhost:5000/notes', {
//         //   // headers: {
//         //   //   Accept: 'application/json',
//         //   //   "Content-Type": "application/json"
//         //   // },
//         //   withCredentials: true // Enable sending cookies
//         // });
//         // let res = await axios.post('http://localhost:5000/users/login', {
//         //   username: "bob",
//         //   password: "bob@bob"
//         // }, {
//         //   withCredentials: true
//         // })
//         // let res = await axios.post('http://localhost:5000/users/register', {
//         //   username: "ramesh",
//         //   password: "ram@ram",
//         //   email: "ram@ram.com"
//         // }, {
//         //   withCredentials: true
//         // })
//         // let res = await axios.get('http://localhost:5000/notes/65dc7e328d90b2bcf678c301', {
//         //   withCredentials: true
//         // })
//         let res = await axios.get('http://localhost:5000/users/user', {
//             withCredentials: true
//         })
//         // let res = await axios.post('http://localhost:5000/users/logout', {}, {
//         //   withCredentials: true
//         // })
//         console.log(res);
//     } catch (error) {
//         console.log('Error:', error.response.data);
//     }
// }

// getUserFromBackend()


  // async function lol() {

  //   let res = await fetch("http://localhost:5000/notes", {
  //     method: "GET",
  //     // credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       // "Access-Control-Allow-Credentials": true,
  //     },
  //   })
  //   let res2 = await res.json()
  //   console.log(res2);
  // }

  // lol()

