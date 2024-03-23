import {useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {checkEmailCode, checkSmsCode} from "../../helpers";

export const Code = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user);
    const title = user.phone ? 'Введите код из смс' : 'Введите код из письма' ; // ???
    const goToHomePage = () => navigate('/home');

    if (!user.phone && !user.email) { // ???
        navigate('/');
        return null;
    }
    const check = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user.phone) {
            checkSmsCode(value)
                .then(goToHomePage)
                .catch(() => setError(true));
        } // ???
        checkEmailCode(value)
            .then(goToHomePage)

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