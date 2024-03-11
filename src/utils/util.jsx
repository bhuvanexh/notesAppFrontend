import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL

console.log(serverURL, 'server urlll');


export function getTextStats(htmlContent) {
    const plainText = htmlContent.replace(/<[^>]*>/g, '');

    const words = plainText.trim().split(/\s+/);
    let wordCount = 0
    if (words.length != 1 && words[0] != '') {
        wordCount = words.length;
    }
    const charCount = plainText.length;

    return {
        wordCount,
        charCount
    };
}



export async function LoginUser(body) {
    try {
        let res = await axios.post(`${serverURL}/users/login`, body, {
            withCredentials: true
        })
        return res
    } catch (error) {
        return error.response
    }
}

export async function RegisterUser(body) {
    try {
        let res = await axios.post(`${serverURL}/users/register`, body, {
            withCredentials: true
        })
        return res
    } catch (error) {
        return error.response
    }
}
export async function SignOutUser() {
    try {
        let res = await axios.post(`${serverURL}/users/logout`, {}, {
            withCredentials: true
        })
        return res
    } catch (error) {
        return error.response
    }
}




export function addNoteLocal(note) {

    note.date = new Date().toISOString();

    let guestNotes = JSON.parse(localStorage.getItem('guestNotes')) || [];

    guestNotes.push(note);

    localStorage.setItem('guestNotes', JSON.stringify(guestNotes));
}

export function getNotesLocal() {
    return JSON.parse(localStorage.getItem('guestNotes')) || [];
}

export function updateNoteLocal(updatedNote) {
    let guestNotes = JSON.parse(localStorage.getItem('guestNotes')) || [];


    const index = guestNotes.findIndex(note => note.id == updatedNote.id);

    if (index !== -1) {
        updatedNote.date = new Date().toISOString();
        guestNotes[index] = updatedNote;

        localStorage.setItem('guestNotes', JSON.stringify(guestNotes));
    }
}

export function deleteNoteLocal(id) {
    let guestNotes = JSON.parse(localStorage.getItem('guestNotes')) || [];

    guestNotes = guestNotes.filter(note => note.id !== id);

    localStorage.setItem('guestNotes', JSON.stringify(guestNotes));
}

