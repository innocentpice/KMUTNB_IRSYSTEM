import axios from 'axios';

const URL = 'https://us-central1-kmutnb-project.cloudfunctions.net/';

export const sendEmail = (email,displayName,callback = ()=>{}) => {
    axios.get(URL+'sendEmail/', {
        params: {
          email,displayName
        }
    }).then(callback());
}
