import React, {useState, useEffect} from 'react';
import publicIp from 'public-ip';
import axios from 'axios';
import './input.scss';
import { Button, Input } from "@chakra-ui/react";
import { key } from '../../api/api';

export const InputBox = ({setContent}) => {

    const [input, setInput] = useState('')

    const [scroll, setScroll] = useState(true)

    const getContent = (ip) => {
        axios.get(`http://api.ipstack.com/${ip}?access_key=${key}`)
            .then(res => {
                setContent(res.data);
            })
    }

    const getPublicIp = () => {
        return publicIp.v4();
    }

    useEffect(() => {
        getPublicIp()
            .then(res => {
                setInput(res);
                getContent(res);
            })
    }, [])

    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY < 50
            if (scrollCheck !== scroll) {
              setScroll(scrollCheck)
            }
          })
    })

    return (
        <div className={scroll ? 'app-inputbox' : 'app-inputbox input-box-small'}>
            <Input 
                value={input}
                onChange={e => setInput(e.target.value)} 
                className={"main-input"} 
                placeholder='IP Address'>     
            </Input>
            <Input disabled className={"main-input dummy-input"}></Input>
            <Button 
            onClick={() => getContent(input)} 
            className={"main-button"} 
            variant='outline'
            >
                Track
            </Button>
        </div>
    )
}
