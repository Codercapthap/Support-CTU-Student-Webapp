import React from 'react';
import { generageTime } from '../../Common/js/vanillaJs';
import { useSelector } from 'react-redux';
import './_style.scss';

function Index(props) {
   const { topic, showControlTopic, showAllPosts, deleteTopic } = props;

   const user = useSelector(state => state.auth.current);

   const dispatchShowPosts = () => {
      showAllPosts(topic.id);
   };

   const handleDelete = async () => {
      // alert('delete');
      console.log('delete ', user.id, topic.user_id);
      await deleteTopic(topic.id);
   };

   const handleUpdate = () => {
      alert('update');
   };

   return (
      <div className="topic-item" onClick={() => dispatchShowPosts()}>
         <div className="topic-infor topic-name">
            <i className="fa-solid fa-outdent"></i>
            <div> {topic.topic_name}</div>
            {(user.id === topic.user_id || user.role === 'admin') && (
               <div>
                  {showControlTopic.delete && (
                     <i className="fa-solid fa-trash" onClick={handleDelete}></i>
                  )}
                  {showControlTopic.update && (
                     <i className="fa-solid fa-wrench" onClick={handleUpdate}></i>
                  )}
               </div>
            )}
         </div>
         <div className="topic-infor topic-description">{topic.topic_description}</div>
         <div className="topic-infor topic-create-time">{generageTime(topic.created_at)}</div>
      </div>
   );
}

export default Index;
