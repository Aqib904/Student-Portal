import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Finance() {
  const history = useHistory();
  const { status} = useSelector((state) => state.authUser);
  useEffect(()=>{
    if(status==false){
      history.push("/student/enrollment")
    }
  },[status])
  return (
    <div>Finance</div>
  )
}
