import React, { useState, useCallback, useEffect, useRef } from 'react';
import './index.css'

function Passgen() {
    const [length, setlength] = useState(8)
    const [number, setnumber] = useState(false)
    const [specC, setspecC] = useState(false)
    const [reset, setreset] = useState(false)
    const [copy, setcopy] = useState(false)
    const [failcopy, setfailcopy] = useState(false)
    const [password, setpassword] = useState("")
    const passref = useRef(null)

    const callbackfunc = useCallback(() => {
        let pass = ""
        let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
        if (number) str += "0123456789"
        if (specC) str += "!@#$%^&*?/{}[];:-_()~`+="
        for (let i = 0; i < length; i++) {
            const char = Math.floor(Math.random() * str.length) + 1
            pass += str.charAt(char)
        }
        setpassword(pass)
        setcopy(false)
    }, [length, number, specC, setpassword])

    const copyclipboard = useCallback(() => {
        if (window.isSecureContext && navigator.clipboard) {
            passref.current?.select()
            navigator.clipboard.writeText(password);
            setcopy(true)
            setfailcopy(false)
            setTimeout(() => {
                setcopy(false)
            }, 2000);
        } else {
            setfailcopy(true)
            setTimeout(() => {
                setfailcopy(false)
            }, 2000);
        }
    }, [password])

    useEffect(() => {
        callbackfunc()
    }, [callbackfunc, length, number, specC, reset])

    return (
        <div className='ol'>
            <div>
                <input className='inputbox' type="text" value={password} readOnly ref={passref} />
                <button onClick={copyclipboard}>copy</button><button onClick={() => setreset(!reset)}>Reset</button>
            </div>
            {
                copy && <><span>password copied</span></>
            }
            {
                failcopy && <><span>Unable to copy password</span></>
            }
            <br />
            <div>
                <input className="range" type="range" min={8} max={50} value={length} onChange={(e) => setlength(e.target.value)} />
                <label >Length ({length})</label>
            </div>
            <div>
                <input className='checkbox' type="checkbox" checked={number} onChange={() => setnumber(!number)} />
                <label >Numbers</label>
            </div>
            <div>
                <input className='checkbox' type="checkbox" checked={specC} onChange={() => setspecC(!specC)} />
                <label >speacial chareacter</label>
            </div>
        </div>
    );
}

export default Passgen;
