import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_ME } from '../utils/queries';
import { ADD_ACTIVITY } from '../utils/mutations';
import '../Profile.css'


const Profile = () => {
  const { data: userData } = useQuery(QUERY_ME);
  const activities = userData?.me?.activities || [];
 
    const [addActivity] = useMutation(ADD_ACTIVITY)

    const [weekday, setWeekday] = useState('');
    const [activityName, setActivityName] = useState('');

    // const [question,setQuestion] = useState('');
    // const [ goalAnswer, setAnswer] = useState('');

    const handleChange = (event, dow) => {
      console.log(event.target.value);
      
      setWeekday(dow);
      setActivityName(event.target.value)
  
    };

    const handleClick = async event => {

      event.preventDefault();
      console.log("addActivity");
      let weekday = event.target.getAttribute("data-weekday");
      let activityName = document.getElementById("textarea-" + weekday).value;
    //   let goalQuestion = event.target.getAttribute("data-goal");
    //   let goalAnswer = document.getElementById("textarea1-" + goalQuestion).value;
      console.log(activityName);
        try {
            // add reaction to database
            await addActivity({
                variables: { weekday, activityName }
            });
        
            // clear form value 
            setWeekday(weekday);
            setActivityName('');
            // setQuestion(goalQuestion);
            // setAnswer('');
            window.location.reload(false);
        } catch (e) {
                console.error(e);
        }
    };




    // const handleClick2 = async event => {

    //     event.preventDefault();
        
    //     let question = event.target.getAttribute("data-weekday");
    //     let goalAnswer = document.getElementById("textarea1-" + question).value;
    //   //   let goalQuestion = event.target.getAttribute("data-goal");
    //   //   let goalAnswer = document.getElementById("textarea1-" + goalQuestion).value;
        
    //       try {
    //           // add reaction to database
    //           await addActivity({
    //               variables: { question, goalAnswer }
    //           });
          
    //           // clear form value 
    //           setQuestion(question);
    //           setAnswer('');
    //           // setQuestion(goalQuestion);
    //           // setAnswer('');
    //           window.location.reload(false);
    //       } catch (e) {
    //               console.error(e);
    //       }
    //   };



  return (

<main className="container body-card m-12 mt-3 pb-1">
    <div className="m-5 row">

            <div className="m-2 p-2 mb-5 col">
                <h3 className="calendar-title text-center"> Your Activities</h3>
                {activities &&
                activities.map(activity => (
                <div key={activity._id} className="text4 text-center calendar-input">
                    <div>{activity?.weekday}: {activity?.activityName}</div>
                </div>
                ))}
                <form onSubmit={handleClick}>
                    <div className="mt-5 time-block">
                        <div className="m-1 day">
                            Sunday
                        </div>
                        <input id="textarea-Sunday" onChange={(event)=> handleChange(event, "Sunday")} className="
                        calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="Sunday" className="btn saveBtn" type="submit"><i className="fas fa-save save-icon"
                                data-weekday="Sunday"></i></button>
                    </div>

                    <div className="time-block">
                        <div className="m-1 day">
                            Monday
                        </div>
                        <input id="textarea-Monday" onChange={(event)=> handleChange(event, "Monday")} className="
                        calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="Monday" className="btn saveBtn"><i className="fas fa-save save-icon" data-weekday="Monday"></i></button>
                    </div>

                    <div className="time-block">
                        <div className="m-1 day">
                            Tuesday
                        </div>
                        <input id="textarea-Tuesday" onChange={(event)=> handleChange(event, "Tuesday")}
                        className="calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="Tuesday" className="btn saveBtn"><i className="fas fa-save save-icon" data-weekday="Tuesday"></i></button>
                    </div>

                    <div className="time-block">
                        <div className="m-1 day">
                            Wednesday
                        </div>
                        <input id="textarea-Wednesday" onChange={(event)=> handleChange(event, "Wednesday")}
                        className="calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="Wednesday" className="btn saveBtn"><i className="fas fa-save save-icon" data-weekday="Wednesday"></i></button>
                    </div>

                    <div className="time-block">
                        <div className="m-1 day">
                            Thursday
                        </div>
                        <input id="textarea-Thursday" onChange={(event)=> handleChange(event, "Thursday")}
                        className="calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="Thursday" className="btn saveBtn"><i className="fas fa-save save-icon" data-weekday="Thursday"></i></button>
                    </div>

                    <div className="time-block">
                        <div className="m-1 day">
                            Friday
                        </div>
                        <input id="textarea-Friday" onChange={(event)=> handleChange(event, "Friday")} className="
                        calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="Friday" className="btn saveBtn"><i className="fas fa-save save-icon" data-weekday="Friday"></i></button>
                    </div>

                    <div className="time-block">
                        <div className="m-1 day">
                            Saturday
                        </div>
                        <input id="textarea-Saturday" onChange={(event)=> handleChange(event, "Saturday")}
                        className="calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="Saturday" className="btn saveBtn"><i className="fas fa-save save-icon" data-weekday="Saturday"></i></button>
                    </div>
                </form>
            </div>

            {/* Health questions */}
            <div className="m-2 p-2 mb-5 col">
                <h3 className="calendar-title text-center"> Your Goals</h3>
                {activities &&
                activities.map(activity => (
                <div key={activity._id} className="text4 text-center calendar-input">
                    <div>{activity?.weekday}: {activity?.activityName}</div>
                </div>
                ))}

                <form onSubmit={handleClick}>
                    <div className="mt-5 time-block">
                        <div className="m-1 day">
                            Current Weight
                        </div>
                        <input id="textarea-currentWeight" onChange={(event)=> handleChange(event, "currentWeight")}
                        className="calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="currentWeight" className="btn
                            saveBtn"><i className="fas fa-save save-icon" data-weekday="currentWeight"></i></button>
                    </div>

                    <div className="time-block">
                        <div className="m-1 day">
                            Goal Weight
                        </div>
                        <input id="textarea-goalWeight" onChange={(event)=> handleChange(event, "goalWeight")}
                        className="calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="goalWeight" className="btn saveBtn"><i className="fas fa-save save-icon" data-weekday="goalWeight"></i></button>
                    </div>

                    <div className="time-block">
                        <div className="m-1 day">
                            How many days do you plan on working out this week?
                        </div>
                        <input id="textarea-goalWorkout" onChange={(event)=> handleChange(event, "goalWorkout")}
                        className="calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="goalWorkout" className="btn saveBtn"><i className="fas fa-save save-icon" data-weekday="goalWorkout"></i></button>
                    </div>

                    <div className="time-block">
                        <div className="m-1 day">
                            What's your dietary plan for this week?
                        </div>
                        <input id="textarea-diet" onChange={(event)=> handleChange(event, "diet")} className="
                        calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="diet" className="btn saveBtn"><i className="fas fa-save save-icon" data-weekday="diet"></i></button>
                    </div>

                    <div className="time-block">
                        <div className="m-1 day">
                            How many hours of sleep do you plan on getting each night?
                        </div>
                        <input id="textarea-goalWorkout" onChange={(event)=> handleChange(event, "goalWorkout")}
                        className="calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="goalWorkout" className="btn saveBtn"><i className="fas fa-save save-icon" data-weekday="goalWorkout"></i></button>
                    </div>

                    <div className="time-block">
                        <div className="m-1 day">
                            Do you plan on reducing your alcohol/drug/tobacco intake this week?
                        </div>
                        <input id="textarea-reduce" onChange={(event)=> handleChange(event, "reduce")} className="
                        calendar-input">
                        </input>
                        <button onClick={(event)=>handleClick(event)} data-weekday="reduce" className="btn saveBtn"><i className="fas fa-save save-icon" data-weekday="reduce"></i></button>
                    </div>
                </form>
            </div>
    </div>
</main>
  );
};
export default Profile;