import { useState } from "react"
import "./inputList.css"
export default function InputList(){

	const [stateOfTasks, setStateOfTasks] = useState(0)
	function handleStateTasks(param){
		setStateOfTasks(param)
	}

	return(
		<div className="InputLists">
			<div className="left">
				<button id={stateOfTasks === 0 ? "onFocus" : " "} onClick={()=>handleStateTasks(0)}>Write Task</button>
				<button id={stateOfTasks === 1 ? "onFocus" : " "} onClick={()=>handleStateTasks(1)}>Current</button>
				<button id={stateOfTasks === 2 ? "onFocus" : " "} onClick={()=>handleStateTasks(2)}>Pending</button>
				<button id={stateOfTasks === 3 ? "onFocus" : " "} onClick={()=>handleStateTasks(3)}>Finished</button>
			</div>
			<div className="right">
				<div className="DisplayTasks">

				</div>
				<div className="WrapElements">
					<div className="wrapInputTag">
						<input type="text" id="" placeholder="Write New Tasks..." />
						<button id="SubmitBtn" onClick={()=>{}}>Submit</button>
					</div>
				</div>
			</div>
		</div>
	)
}