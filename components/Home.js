import { useState } from "react"
import {Pressable,TextInput, ScrollView, View } from "react-native"
import { Text, Keyboard } from "react-native"
import styles from "../style/style"
import Header from "./Header"
import Footer from "./Footer"

export default Home= ({navigation})=>{
    const [player, setPlayer] = useState("")
    const [hasplayername, sethasplayername]=useState(false)
    const handleplayername=(value)=>{
        if(value.trim().length>0){
            sethasplayername(true)
            Keyboard.dismiss()
        }
    }
return(
    <ScrollView>
    <View>
        <Header/>
        {!hasplayername
        ?
        <>
            <Text style={styles.gameinfo}>
                For scoreboard enter your name:
            </Text>
            <TextInput autoFocus={true} onChangeText={setPlayer} style={styles.textinput}></TextInput>
            
            <Pressable style={styles.button} onPress={()=>handleplayername(player)}>
            <Text style={styles.buttonText}>
              Enter
            </Text>
        </Pressable>
            
            </>
        :
        <>
        <Text style={styles.gameinfo}>Rules of the game</Text>
        <Text style={styles.rules}>
            THE GAME: Upper section of the classic Yahtzee dice game. You have dices and for the every dice you have throws. After each throw you can keep dices in order to get same dice spot counts as many as possible. In the end of the turn you must select your points from  to. Game ends when all points have been selected. The order for selecting those is free.
        </Text>
        <Text style={styles.rules}>
            POINTS: After each turn game calculates the sum for the dices you selected. Only the dices having the same spot count are calculated. Inside the game you can not select same points from to again. 
        </Text>
        <Text style={styles.rules}>
            GOAL: To get points as much as possible.63 points is the limit of 
            getting bonus which gives you 50 more points.
        </Text>
        <Text style={styles.name}>Good luck {player}</Text>

        <Pressable style={styles.button} onPress={()=>navigation.navigate('Gameboard',{player:player})}>
            <Text style={styles.buttonText}>
                Play
            </Text>
        </Pressable>
        </>
        }
        <Footer/>
    </View>
    </ScrollView>
)
}

