import { useEffect, useRef, useState } from "react"
import "./Cart.css"
import CartItems from "./Cart_items/Cart_items"

const database = firebase.database()
export default function Cart({cartState, handleCartState, Total, totalCosts, itemNum}){
	
	let userLoggedIn
	const someData = [{nothing: "null"}]
	function clearCart(){
		var UserData
		const user_ref = database.ref("users")
		user_ref.on("value", function(snapshot){
			var data = snapshot.val()
			UserData = data
			totalCosts = 0
			for(let i = 0; i < UserData.length; i++){
				if(UserData[i].isLoggedin == true){
					UserData[i].Cart = someData

					break
				}
			}
		})
		database.ref("users").set(UserData)
	}
	
	function readCartPrice(){
		const local = JSON.parse(localStorage.getItem("LoginDevices"))
		var CartData, UserData
		const user_ref = database.ref("users")
		user_ref.on("value", function(snapshot){
			var data = snapshot.val()
			UserData = data
			totalCosts = 0
			for(let i = 0; i < UserData.length; i++){
				if(UserData[i].isLoggedin == true && !UserData[i].Cart[UserData[i].Cart.length - 1].nothing){
					CartData = UserData[i].Cart

					for(let j = 0; j < CartData.length; j++){
						if(CartData != j){
							totalCosts += CartData[j].price
							readedPrice()
						}else{
							break
						}
					}

					break
				}
			}
		})
	}
	function readedPrice(){
		if(Total == true){
			Total.current.textContent = "Total Items: " + totalCosts
		}else{
			setTotalCosts(totalCosts)
		}
	}
	const TryAgain = useEffect(()=>{
		var CartData
		const user_ref = database.ref("users")
		user_ref.on("value", function(snapshot){
			var data = snapshot.val()
				setRenderedUsers(data)
				userLoggedIn = data
				for(let i = 0; i < userLoggedIn.length; i++){
					if(userLoggedIn[i].isLoggedin == true){
						CartData = userLoggedIn[i].Cart
						setStateCart(CartData)
						readCartPrice()
						break
					}else if(userLoggedIn[i].isLoggedin != true){
						setStateCart(someData)
						
						if(i >= userLoggedIn.length){
							break
						}
					}
				}
		})
	},[])
	const [RenderedUsers, setRenderedUsers] = useState(TryAgain)
	const [TotalCosts, setTotalCosts] = useState()
	const [stateOfCart, setStateCart] = useState(null)
	if(RenderedUsers != null){
		return(
			<>
				<div className={cartState == 1 ? "Cart-Wrapper" : "Cart-Wrapper notOnCart"}>
					<button className="back" id="backSign" onClick={()=>handleCartState(0)}>&nbsp;←</button>

					<img src="Images/cart.png" id="image" width={170} height={170} alt="" />
					<h1 id="Cart-Logo">Cart</h1>

					<div className={stateOfCart[stateOfCart.length - 1].nothing == someData[0].nothing ? "No-NoItems" : "wrap_elements"}>
						<h1 ref={Total}>Total Costs: {TotalCosts}</h1>
						<button id="remove_items" onClick={()=>clearCart()}>Clear</button>
					</div>

					<div className="Cart_Container">
					{stateOfCart[stateOfCart.length - 1].nothing != someData[0].nothing ? RenderedUsers.map((users)=>{
						if(users.isLoggedin == true && users.Cart[0].nothing != "null"){
							return (users.Cart.map((item, idx)=>
							<CartItems 
							key={idx} 
							idx={idx} 
							totalCosts={totalCosts} 
							image={item.image} 
							name={item.name} 
							price={item.price} 
							set={item.set}
							readCartPrice={()=>readCartPrice()}
							itemNum={()=>itemNum()}  />))
							
						} 
					}) : console.log()}
					</div>
					
					<h1 id={stateOfCart[stateOfCart.length - 1].nothing == someData[0].nothing ? "NoItems" : "No-NoItems"}>No Items...</h1>

				</div>
				
			</>
		)
	}
	
}

