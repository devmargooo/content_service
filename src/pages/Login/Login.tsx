import {FormEvent, FormEventHandler, useState} from "react";
import {isEmail, isPhone, sendEmailCode, sendSms} from "../../helpers";
import {useDispatch} from "react-redux";
import {setEmail, setPhone} from "../../store";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = useState<string>('');
    const [notValid, setNotValid] = useState<boolean>(false);

    const goToCodePage =  () => navigate('/code');
    const tryToLogin = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPhone(value)) {
            dispatch(setPhone(value));
            sendSms(value).then(goToCodePage);
            return;
        }
        if (isEmail(value)) {
            dispatch(setEmail(value));
            sendEmailCode(value).then(goToCodePage);
            return;
        }
        setNotValid(true);
    }
    return (
        <form onSubmit={tryToLogin}>
            <h1>Введите ваш логин</h1>
            <div className={'margin-bottom-50'}>
                <input type={'text'} value={value} onChange={(e) => setValue(e.target.value)}/>
                {notValid && <div className={'error'}>Логин введен неверно</div>}
            </div>
            <div className={'margin-bottom-50'}>
                <button type='submit'>Далее</button>
            </div>
        </form>
    )
}