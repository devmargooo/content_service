import {useState} from "react";
import {auth, parseLogin} from "../../helpers";
import {useDispatch} from "react-redux";
import {setLogin} from "../../store";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = useState<string>('');
    const [notValid, setNotValid] = useState<boolean>(false);
    const tryToLogin = () => {
        try {
            const result = parseLogin(value);
            dispatch(setLogin(result));
            auth(result).then(() => {
                navigate('/code');
            })
        } catch (e) {
            setNotValid(true);
        }
    }
    return (
        <form onSubmit={tryToLogin}>
            <h1>Введите ваш логин</h1>
            <div className={'margin-bottom-50'}>
                <input type={'text'} value={value} onChange={(e) => setValue(e.target.value)}/>
                {notValid && <div>Логин введен неверно</div>}
            </div>
            <div className={'margin-bottom-50'}>
                <button type='submit'>Далее</button>
            </div>
        </form>
    )
}