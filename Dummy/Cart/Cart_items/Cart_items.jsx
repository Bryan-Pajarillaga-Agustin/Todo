import { useEffect, useState } from "react"
const database = firebase.database()
export default function CartItems({name, price, itemNum, readCartPrice, image, idx}){
	
	let someData = {nothing: "null"}
	let priceData
	

	function removeItem(idx){
		var UsersData
		var UsersCart
		var device = JSON.parse(localStorage.getItem("LoginDevices"))
		const user_ref = database.ref("users")
		user_ref.on("value", function(snapshot){
			var data = snapshot.val()
			UsersData = data
			for(let i = 0; i < UsersData.length; i++){
				if(UsersData[i].isLoggedin == true && UsersData[i].Cemail == device){
					UsersCart = UsersData[i].Cart

					if(UsersData[i].Cart.length == 1){
						priceData = UsersData[i].Cart[idx].price
						UsersData[i].Cart.unshift(someData)
						UsersData[i].Cart.pop()
						readCartPrice()
						break
					} else if(UsersData[i].Cart.length >= 2){
						priceData = UsersData[i].Cart[idx].price
						UsersData[i].Cart.splice(idx, 1)
						readCartPrice()
						break
					}
				} 
			}
		})
		database.ref("users").set(UsersData)
	}
	


	return (
		<div className="EachCartItems">
			<img src={image} width={150} height={150}/>

			<div className="item-content">
				<div className="wrap-elements">
					<h2>{name}</h2>
					<button id="remove-item" onClick={()=>{removeItem(idx), readCartPrice(), itemNum()}}>x</button>
				</div>
				<h3 id="price">{price} PHP</h3>
			</div>
		</div>
	)

}