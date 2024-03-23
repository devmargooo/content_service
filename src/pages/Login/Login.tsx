import {useState} from "react";
import {auth, InvalidLoginError, parseLogin} from "../../helpers";
import {useDispatch} from "react-redux";
import {setLogin} from "../../store";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const tryToLogin = () => {
        try {
            const result = parseLogin(value);
            dispatch(setLogin(result));
            auth(result).then(() => {
                navigate('/code');
            })
        } catch (e) {
            if (e instanceof InvalidLoginError) {
                setError(e.message);
                return;
            }
            setError('Неизвестная ошибка');
        }
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setError(null);
    }
    return (
        <form onSubmit={tryToLogin}>
            <h1>Введите ваш логин</h1>
            <div className={'margin-bottom-50'}>
                <input type={'text'} value={value} onChange={onChange}/>
                {error && <div>{error}</div>}
            </div>
            <div className={'margin-bottom-50'}>
                <button type='submit'>Далее</button>
            </div>
        </form>
    )
}