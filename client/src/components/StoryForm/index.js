import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_STORY } from '../../utils/mutations';
import { QUERY_STORIES, QUERY_ME } from '../../utils/queries';


const StoryForm = () => {

    const [addStory, { error }] = useMutation(ADD_STORY, {
        update(cache, { data: { addStory } }) {
          try {
            // could potentially not exist yet, so wrap in a try...catch
            const { stories } = cache.readQuery({ query: QUERY_STORIES });
            cache.writeQuery({
              query: QUERY_STORIES,
              data: { stories: [addStory, ...stories] }
            });
          } catch (e) {
            console.error(e);
          }
      
          
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, stories: [...me.stories, addStory] } }
          });
        }
    });


    const [storyText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add story to database
          await addStory({
            variables: { storyText }
          });
      
          // clear form value
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
    };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
      <textarea
        placeholder="Share your story"
        value={storyText}
        className="form-input col-12 col-md-9"
        onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StoryForm;