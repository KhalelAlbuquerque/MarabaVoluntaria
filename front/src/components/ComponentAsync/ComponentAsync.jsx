import React from 'react'
import request from '@/helpers/request';

async function getData() {

    const fetchData =  await request()

    return fetchData

}

export default async function ComponentAsync() {

    const data = await getData()

    let posts

    posts = data.posts

  return (
    <div>
        {posts.map((post,index) => (
            <div key={index+1}>
                <p>{post.title}</p>
                <p>{post.description}</p>
            </div>
        ))}
    </div>
    )
}
