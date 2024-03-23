import {useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {checkCode, Login, NotCorrectCodeError, parseCode} from "../../helpers";

const getTitles = (value:Login) => {
    switch (value.type) {
        case 'email': return 'Введите код из письма'
        case 'phone': return 'Введите код из смс'
    }
}

export const Code = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string | undefined>();
    const login = useSelector((state: RootState) => state.user.login);

    if (!login) {
        navigate('/');
        return null;
    }

    const title = getTitles(login);

    const check = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const code = parseCode(value);
            checkCode(login, code)
                .then(() => { navigate('/home');})
                .catch(() => setError('Неверный код'));
        } catch (e) {
            if (e instanceof NotCorrectCodeError) {
                setError(e.message);
                return;
            }
            setError('Неизвестная ошибка');
        }
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