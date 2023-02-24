import http from 'k6/http';

import {check} from 'k6';

const serviceBaseUrl = 'http://localhost:8089'

export const options = {

    vus: 10,
    stages:[
        {duration: '30s', target: 1},
        {duration: '1m30s', target: 10},
        {duration: '20s', target: 0}
    ],
  
  };

  export default function () {

    const responseAuthen = http.post(serviceBaseUrl+'/authenticate',JSON.stringify({
        username: "earthly",
        password: "12345"
    }),{headers: { 'Content-Type': 'application/json' }})

    const authenToken = responseAuthen.json().access_token

    const params = {
        headers: { 'Authorization': 'Bearer ' + authenToken },
      };
    
    const responseCreateNewBlog = http.post(serviceBaseUrl+'/blog',JSON.stringify({
        title:"Blog for Earthly",
        content:"Blog for Earthly",
        author:"Donald Le"
    }),params)
  
    check(responseAuthen, { 'status was 200': (r) => r.status == 200 });

    check(responseCreateNewBlog, { 'status was 200': (r) => r.status == 200 });
  
  }
