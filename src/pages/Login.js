import { useEffect, useState } from 'react'
import { storeUser, userData } from '../helpers';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../View/LoginForm';

export default function Login() {
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    // se l'utente è loggato, viene reindirizzato alla home
    useEffect(() => {
        const user = userData();

        if (user && user.jwt) navigate('/');
    }, [navigate]);

    const login = async (event) => {

        event.preventDefault();
        setMessage(null);

        // prende tutti i valori del form e li trasforma in un json
        const formData = new FormData(event.target);
        const jsonData = Object.fromEntries(formData);

        // richiesta POST
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        };

        const req = await fetch('http://localhost:1337/api/auth/local', reqOptions);
        const res = await req.json();

        // gestione errori
        if (res.error) {
            setMessage(res.error.message);
            return;
        }

        // se l'utente ha effettuato il login, viene memorizzato l'utente nel localStorage
        if (res.jwt && res.user) {
            setMessage(`You are logged in as ${res.user.username}`);
            storeUser(res);
            navigate(0)
        }
        
        console.log(res)
    };

    return (
        <LoginForm message={message} login={login} />
    )
}