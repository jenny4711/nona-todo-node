import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from '../utils/api';
import {useNavigate} from "react-router-dom"


const RegisterPage = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [secPassword,setSecPassword]=useState("");
  const [error,setError]=useState("")
  const navigate= useNavigate()

  async function handleSubmit(evt){
    evt.preventDefault();
    try{
      if(password !== secPassword){
        throw new Error("패스워드가 일치하지 않습니다. ")
      }
      const res = await api.post('/user',{name,email,password})
      if(res.status === 200){
        navigate('/login')
      }else{
        throw new Error(res.data.error)
      }
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <div className="display-center">
      {error && <div>{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" onChange={(evt)=>setName(evt.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(evt)=>setEmail(evt.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(evt)=>setPassword(evt.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange={(evt)=>setSecPassword(evt.target.value)} />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
