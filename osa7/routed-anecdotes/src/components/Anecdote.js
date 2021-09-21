import React from "react";

const Anecdote = ({ anecdote }) => {
  //console.log(anecdote)
  
  return (
    <div>
      <h3>
        {anecdote.content} by {anecdote.author}
      </h3>
      <div>
        has {anecdote.votes} votes
      </div>
      <div>
        for more information see {anecdote.info}
      </div>
    </div>
  )
}

export default Anecdote