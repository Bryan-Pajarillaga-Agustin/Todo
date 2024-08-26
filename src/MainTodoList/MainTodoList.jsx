import "./MainTodoList.css"
import Header from "./Header/Header.jsx"
import Sidebar from "./SideBar/Sidebar.jsx"
import InputList from "./InputList/InputList.jsx"
export default function MainTodoList(){
	return(
		<>	
		<div className="MainContents">
			<Header></Header>
			<InputList></InputList>
		</div>
			<Sidebar></Sidebar>
		</>
	)
}