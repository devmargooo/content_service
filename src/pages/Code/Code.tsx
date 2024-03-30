import {useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {checkCode, isEmail, isPhone} from "../../helpers";

const getTitles = (value:string) => {
    if (isPhone(value)) {
        return 'Введите код из смс'
    }
    if (isEmail(value)) {
        return 'Введите код из письма'
    }
    // ???
}

export const Code = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const login = useSelector((state: RootState) => state.user.login);

    if (!login) {
        navigate('/');
        return null;
    }

    const title = getTitles(login);

    const check = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isEmail(login) && !isPhone(login)) {
            return; // ???
        }
        checkCode(login, value)
            .then(() => { navigate('/home');})
            .catch(() => setError(true));
    };
    return (
        <form onSubmit={check}>
            <h1>{title}</h1>
            <div className={'margin-bottom-50'}>
                <input type={'text'} value={value} onChange={(e) => setValue(e.target.value)}/>
                {error && <div>Код введен неверно</div>}
            </div>
            <div className={'margin-bottom-50'}>
                <button type='submit'>Далее</button>
            </div>
        </form>
    )
}