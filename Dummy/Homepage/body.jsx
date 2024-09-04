import { useRef, useState, useEffect } from 'react'
import './Content.css'
import './CreateAccount.css'

const database = firebase.database()
const storage = firebase.storage()


function MainContent({buttons, setActive, onHandleUsers}){
	const violation0 = useRef(null)
	const violation1 = useRef(null)
	const violation2 = useRef(null)
	let fileItem
	const fileName = useRef(null)
	const profileImg = useRef(null)
	let profileLink
	const usernameInput = useRef(null)
	const passwordInput = useRef(null)
	const Active_Image = useRef(null)
	const Active_Name = useRef(null)
	const SignInForm = useRef(null)
	const SignPersonal = useRef(null)
	const Cemail = useRef(null)
	const Cpass = useRef(null)
	const Cconfirm = useRef(null)
	const Age = useRef(null)
	const First_name = useRef(null)
	const Bday = useRef(null)
	const Last_name = useRef(null)
	const Middle_name = useRef(null)
	const Sex = useRef(null)
	const Civil_status = useRef(null)
	const Job = useRef(null)
	const [userLists, setUsers] = useState(null)
	function ChangeProfile(event) {
		const fileItem = event.target.files[0];
		const FileName = fileName.current.value;
		const uniqueId = Date.now().toString();
		const storageRef = storage.ref("images/" + uniqueId + "_" + fileItem.name);
	 
		// Track upload progress
		const uploadTask = storageRef.put(fileItem);
		uploadTask.on(
		  "state_changed",
		  (snapshot) => {
			 // Observe state change events such as progress, pause, and resume
			 const progress = Math.floor(((snapshot.bytesTransferred / snapshot.totalBytes) * 100), 5);
			 profileImg.current.textContent = "Uploading: " + progress
			 // Update UI with progress information
		  },
		  (error) => {
			 // Handle unsuccessful uploads
			 console.error("Error uploading file:", error);
			 // Display an error message to the user
		  },
		  () => {
			 // Handle successful uploads on complete
			 profileImg.current.textContent = "";
			alert("Upload complete!")
			 // Get the download URL
			 uploadTask.snapshot.ref.getDownloadURL().then((url) => {
				console.log(url);
				profileLink = url;
				profileImg.current.style.backgroundImage = "url('" + profileLink + "')";
			 });
		  }
		);
	 }
	function CheckViolation(){
		Cemail.current.value == "" ? violation0.current.textContent = "Fill this form first!":violation0.current.textContent = ""
		Cpass.current.value == "" ? violation1.current.textContent = "Fill this form first!":violation1.current.textContent = ""
		Cconfirm.current.value == "" ? violation2.current.textContent = "Fill this form first!":violation2.current.textContent = ""

		if(!Cemail.current.value.includes("@gmail.com")){
			violation0.current.textContent = "Invalid gmail!"
		} else {violation0.current.textContent = ""}
		if(Cpass.current.value.length <= 7){
			violation1.current.textContent = "password length must be 8 and above!"
		} else {violation1.current.textContent = ""}
		if(Cconfirm.current.value != Cpass.current.value){
			violation2.current.textContent = "The password doesn't match!"
		} else {violation2.current.textContent = ""}
	}
	function ToPersonalInfos(){
		SignInForm.current.style.display = "none"
		SignPersonal.current.style.display = "flex"
		if(Cemail.current.value.length >= 8 &&
			Cpass.current.value == Cconfirm.current.value &&
			Cemail.current.value.includes("@gmail.com") && Cpass.current.value.length >= 8
		){
			SignInForm.current.style.display = "none"
			SignPersonal.current.style.display = "flex"
		}
		
		Cemail.current.value == "" ? violation0.current.textContent = "Fill this form first!":violation0.current.textContent = ""
		Cpass.current.value == "" ? violation1.current.textContent = "Fill this form first!":violation1.current.textContent = ""
		Cconfirm.current.value == "" ? violation2.current.textContent = "Fill this form first!":violation2.current.textContent = ""

		if(!Cemail.current.value.includes("@gmail.com")){
			violation0.current.textContent = "Invalid gmail!"
		} else {violation0.current.textContent = ""}
		if(Cpass.current.value.length <= 7){
			violation1.current.textContent = "password length must be 8 and above!"
		} else {violation1.current.textContent = ""}
		if(Cconfirm.current.value != Cpass.current.value){
			violation2.current.textContent = "The password doesn't match!"
		} else {violation2.current.textContent = ""}
	}
	function CreateAcc(){
		for(let i = 0; i < userLists.length ; i++){
			if(userLists[i].username != Cemail.current.value &&
				userLists[i].password != Cpass.current.value 
			){
				if(profileLink == null){
					profileLink = "https://firebasestorage.googleapis.com/v0/b/recreate-react.appspot.com/o/images%2FNoProf.jpg?alt=media&token=c741e62b-a005-40e7-b3bf-c633e3cd429d"
				}
				const setNewUser = {
					Cemail: Cemail.current.value,
					password: Cpass.current.value,
					First_name: First_name.current.value,
					Middle_name: Middle_name.current.value,
					Last_name: Last_name.current.value,
					profilePic: profileLink,
					Job: Job.current.value,
					Sex: Sex.current.value,
					Bday: Bday.current.value,
					Age: Age.current.value,
					Civil_status: Civil_status.current.value,
					Cart: [{nothing: "null"}],
					isLoggedin: false
				};

				const updatedUsers = [...userLists, setNewUser];
				setUsers(updatedUsers);

				console.log(updatedUsers)
				database.ref('users/').set(updatedUsers)
				SignPersonal.current.style.display = "none"
				SignInForm.current.style.display = "flex"
				setSignInbox(0)
				alert("You Have Successfully Created An Account")
				break
			}
		}
	}
	function SetTabs(par){
		setActive(par)
	}
	const [SignInbox, setSignInbox] = useState(0)
	const [doesActive, setDoesActive] = useState(0)
	function SignInboxState(par){
		setSignInbox(par)
		Cemail.current.value = ""
		Cpass.current.value = ""
		Cconfirm.current.value = ""
		Bday.current.value = ""
		First_name.current.value = ""
		Middle_name.current.value = ""
		Last_name.current.value = ""
		Sex.current.value = ""
		Job.current.value = ""
		Civil_status.current.value = ""
		Age.current.value = ""
		violation0.current.textContent = ""
		violation1.current.textContent = ""
		violation2.current.textContent = ""
		profileImg.current.style.backgroundImage = `url('./public/Images/NoProf.jpg')`
	}
	function Login(){
		const localVariable = JSON.parse(localStorage.getItem("LoginDevices"))
		let userUpdate = userLists
		for(let i = 0; i < userLists.length; i++){
			if(userLists[i].Cemail == usernameInput.current.value &&
				userLists[i].password == passwordInput.current.value
			){
				userUpdate[i].isLoggedin = true
				setUsers(userUpdate)
				passwordInput.current.value = ""
				alert("Disclaimer! \n\n You are not Logged In, this is just a beta web app and there is no Logging in nor create an account on this web app. Thank you in advance and Maganda or Pogi ka kung nakita mo to!😎😎")


				database.ref("users/").set(userUpdate)
				localStorage.setItem("LoginDevices", JSON.stringify(userUpdate[i].Cemail))
					
				setDoesActive(1)
				Active_Image.current.style.backgroundImage = `url('${userUpdate[i].profilePic}')`
				Active_Name.current.textContent = `Hello From ${userUpdate[i].First_name}!`
			}
		}	
	}
	function LogOut(){
		const localVariable = JSON.parse(localStorage.getItem("LoginDevices"))
		const userUpdate = userLists

		for(let i = 0; i < userUpdate.length; i++){
			if(userUpdate[i].isLoggedin == true && userUpdate[i].Cemail == localVariable){
				userUpdate[i].isLoggedin = false
				setDoesActive(0)
				setUsers(userUpdate)
				localStorage.clear("LoginDevices")
				database.ref("users/").set(userUpdate)
			}
		}
	}
	
	useEffect(()=>{
		const localVariable = JSON.parse(localStorage.getItem("LoginDevices"))
		const user_ref = database.ref("users")
		user_ref.on("value", function(snapshot){
			var data = snapshot.val()
			if(data == null){
				var dummy = [{
					username: "username",
					password: "password",
					Fullname: "nothing"
				}]
				database.ref("users/").set(dummy)
			} else {
				setUsers(data)
				onHandleUsers(data)
				for(let i = 0; i < data.length; i++ ){
					if(data[i].isLoggedin == true && localVariable == data[i].Cemail){
						setDoesActive(1)
						Active_Image.current.style.backgroundImage = `url('${data[i].profilePic}')`
						Active_Name.current.textContent = `Hello From ${data[i].First_name}!`
					}
				}
			} 
		})
	
	}, [])
	return (
		<>
			<div className={buttons === 0 ? "Main_Content" : "Main_Content none"}>
				<div className="content-wrap">
					<div className="left-content">
						<div className="left-text-contents">
							<h1>Welcome User <img id="react-icon" src="./Images/react-removebg-preview.png" width={90} height={90}/></h1>
							<p id="Message">
								This app is made by React JS. This is a simple practice project, therefore the UI/UX is not fully functional.
							</p>
						</div>

						<div className="down-left-corner">
							<p id='check-prod'>Check Our Products</p>
							<button id="products" onClick={()=>SetTabs(1)}>Products</button>
						</div>
						
					</div>
					<div className="right-content">
						<div className={doesActive == 0 ? "Log-in" : "not-Logged-In"}>
							<h1>Log In</h1>
							<label htmlFor="username" id="userLabel" >Username</label>
							<input type="text" id="username" ref={usernameInput} />
							<label htmlFor="password" id="passLabel" >Password</label>
							<input type="password" id="password" ref={passwordInput} />
							<button onClick={()=>Login()}>Login</button>
							<p>Doesn't have an account? <span id='create-account-span' onClick={()=>SignInboxState(1)}><em><u>Create Account</u></em></span></p>
						</div>

						<div className={doesActive == 1 ? "Logged-In" : "not-Logged-In"}>
							<div className='Display_Actived_Profile' ref={Active_Image}></div>
							<div className='wrapper-active'>
								<h1 ref={Active_Name}></h1>
								 <button onClick={()=>{
									const localVariable = JSON.parse(localStorage.getItem("LoginDevices"))
									for(let i = 0; i < userLists.length; i++){
										if(userLists[i].isLoggedin == true && localVariable == userLists[i].Cemail){
											alert(`
Email: '${userLists[i].Cemail}' \n
Password: '${userLists[i].password}' \n
First Name: '${userLists[i].First_name}' \n
Middle Name: '${userLists[i].Middle_name}' \n
Last Name: '${userLists[i].Last_name}' \n
Job: '${userLists[i].Job}' \n
Sex: '${userLists[i].Sex}' \n
Civil Status: '${userLists[i].Civil_status}' \n
Age: '${userLists[i].Age}' \n
BirthDay: '${userLists[i].Bday}' \n
												`)
											break
										}
									}
								 }}>Check Your Info</button>
								 <button onClick={()=>LogOut()}>Log Out</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={SignInbox >= 1 ? "SigninBox" : "SigninBox not"}>
				<div className="SignInForm" ref={SignInForm}>
						<button className="back" id="backSign" onClick={()=>SignInboxState(0)}>&nbsp;←</button>
						<h1 className="Sign-Log"> Sign In </h1>
						<input type="text" placeholder="Email" onChange={()=>CheckViolation()} className="inputSign" ref={Cemail}/>
						<span className="violation" id="violation0" ref={violation0}></span>
						<input type="password" placeholder="Password" onChange={()=>CheckViolation()} id="createpass" className="inputSign" ref={Cpass}/>
						<span id="violation1" className="violation"  ref={violation1}></span>
						<input type="password" id="confirm" onChange={()=>CheckViolation()}  placeholder="Confirm Password" className="inputSign" ref={Cconfirm}/>
						<span id="violation2" className="violation" ref={violation2}></span>
						<button id="SignUp" onClick={()=>ToPersonalInfos()}>Create Account</button>
						<div className="OptionSignUp">Already Have an Account? <u id="Create" onClick={()=>SignInboxState(0)}>Log In</u></div>
				</div>
				<div className="UserForm" ref={SignPersonal}>
					<button className="back" id="backUser" onClick={()=>{{SignInForm.current.style.display = "flex"
																							SignPersonal.current.style.display = "none"
					}}}>&nbsp;←</button>
					<div className="profilePic">
						<label htmlFor="ProfileInput" id="profiledis" ref={profileImg}></label>
						<button id="ProfPicButton"><label htmlFor="ProfileInput">Choose A Photo</label></button>
						<input type="file" id="ProfileInput" ref={fileName} onChange={(e)=>ChangeProfile(e)}/>
					</div>
					<div className="Infos">
						<div className="left">
							<input type="text" ref={First_name} className="infoInputs" placeholder="First Name"/>
							<input type="text" ref={Last_name} className="infoInputs" placeholder="Last Name"/>
							<input type="text" ref={Middle_name} className="infoInputs" placeholder="Middle Name"/>
							<input type="text" id="Age" ref={Age} className="infoInputs" placeholder="Age"/>
						</div>
						<div className="right">
							<input type="text" ref={Civil_status} className="infoInputs" placeholder="Civil_Status"/>
							<input type="date" ref={Bday} className="infoInputs" placeholder="Birthday"/>
							<input type="text" ref={Job} className="infoInputs" placeholder="Job"/>
							<input type="text" ref={Sex} className="infoInputs" placeholder="Male/Female/No_EXP"/>
						</div>
					</div>
					<button id="Proceed" onClick={()=>{CreateAcc(); SignInboxState(0)}}>Proceed</button>
				</div>
			</div>
		</>
	)
}
export default MainContent 