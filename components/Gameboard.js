import React, { useState, useEffect} from "react";
import { Text, View, Pressable } from "react-native";
import { Col, Grid} from 'react-native-easy-grid';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import styles from '../style/style';
import { NBR_OF_DICES, NBR_OF_THROWS,BONUS_POINTS,BONUS_POINTS_LIMIT,MAX_SPOT} from "../constants/Constants";



let board = [];




export default Gameboard = ({route}) => {

    const [player, setplayer] = useState("");
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] =useState(NBR_OF_THROWS);
    const [status, setStatus]=useState('Game has not started');
    const [selectedDices, setSelectedDices]=useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedDicePoints, setSelectedDicePoints]=useState(new Array(MAX_SPOT).fill(false));
    const [diceSpots, setDiceSpots]=useState(new Array(NBR_OF_DICES).fill(0));
    const [totalDicePoints, setTotalDicePoints]=useState(new Array(MAX_SPOT).fill(0));
    const [totalPoints, setTotalPoints]=useState(0);
    const [bonusPoints, setBonusPoints]=useState(BONUS_POINTS_LIMIT);


    const row =[]
    if(nbrOfThrowsLeft===3){
        row.push(
            <MaterialCommunityIcons
            name="dice-multiple"
            key={'multiple-dice'}
            size={60}
            color="#3A1078"
            ></MaterialCommunityIcons>
        )
    }else{
        for(let i=0 ; i < NBR_OF_DICES;i++){
            row.push(
                <Pressable 
                key={row+i}
                onPress={()=>selectDice(i)}>
                    <MaterialCommunityIcons 
                    name={board[i]}
                    key={row+i}
                    size={70}
                    color={getDiceColor(i)}>
                    </MaterialCommunityIcons>
                </Pressable>
            )
    }
    }   


    const pointsRow = []
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"points"+spot}>
                <Text key={"points"+spot} >{getSpotTotal(spot)}</Text>
            </Col>
        )
    }


    const buttonRow = [];
    for (let dicebutton = 0; dicebutton < MAX_SPOT ; dicebutton++) {
        buttonRow.push(
        <Col key={'buttonsRow'+dicebutton}>
            <Pressable 
                key={'buttonsRow'+dicebutton}
                onPress={() => selectDicePoints(dicebutton)}>
                <MaterialCommunityIcons
                    name={"numeric-" + (dicebutton + 1) + "-circle"}
                    key={"buttonsRow"+ dicebutton}
                    size={40}
                    color={getDicePointsColor(dicebutton)}
                ></MaterialCommunityIcons>
            </Pressable>
        </Col>
    )}


    const selectDice=(i)=>{
        let dices = [...selectedDices]
        dices[i]=selectedDices[i] ? false : true
        setSelectedDices(dices)
    }

    function getDiceColor(i){
        return selectedDices[i] ? "black" :"#3A1078"
    }
    function getDicePointsColor(i){
        return selectedDicePoints[i] ? "black" :"#3A1078"
    }


    useEffect(()=>{
        if(player===""&&route.params?.player){
            setplayer(route.params.player)
        }
    })

    useEffect(()=>{
        
       checkPoints()
        if(nbrOfThrowsLeft< NBR_OF_THROWS){
            setStatus('Throw dices')
        }
        if(nbrOfThrowsLeft<0){
            setNbrOfThrowsLeft(NBR_OF_THROWS-1)
        }
    },[nbrOfThrowsLeft])

    function getSpotTotal(i){
        return totalDicePoints[i]
    }

    function selectDicePoints(i){
        if(nbrOfThrowsLeft>0){
            setStatus('Throw 3 times before setting points')
        }else{
            let selected=[...selectedDices]
            let selectedPoints=[...selectedDicePoints]
            let points=[...totalDicePoints]

            if(selectedPoints[i]){
                setStatus('You already selected points for '+[i+1])
            }else{
                if(!selectedPoints[i]){
                    selectedPoints[i]=true
                    let nbrOfDices=diceSpots.reduce((total, x)=>(x===(i+1)? total +1 : total),0)
                    points[i]=nbrOfDices*(i+1)
                    setTotalDicePoints(points)
                }
                selected.fill(false)
                setSelectedDices(selected)
                setSelectedDicePoints(selectedPoints)
                setNbrOfThrowsLeft(NBR_OF_THROWS)

                if(selectedPoints.every((point)=>point)){
                    setStatus('Game over. All points selected')
                }
                return points[i]
            }
        }
    }

    const throwDices =()=>{
        if(nbrOfThrowsLeft===0){
            setStatus('Select your points before next throw')
        }else{
            let spots=[...diceSpots]
            for(let i = 0; i<NBR_OF_DICES;i++){
                if(!selectedDices[i]){
                    let randomNumber = Math.floor(Math.random()*6+1)
                    board[i]='dice-'+randomNumber
                    spots[i]=randomNumber
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft-1)
            setDiceSpots(spots)
            setStatus('Select and throw dices again')
        }



    }

    const checkPoints = ()=>{
       const dpt =[...totalDicePoints]
       const sum = dpt.reduce((total, a)=>total+a,0)

       if(nbrOfThrowsLeft>=0){
        setTotalPoints(sum)
        checkBonusPoints(sum)
       }
    }

    const checkBonusPoints=(sum)=>{
        const bonus = BONUS_POINTS_LIMIT-sum

        if(bonus<=0){
            setBonusPoints(0)
            setTotalPoints(sum+BONUS_POINTS)
        }else if(bonus>0){
            setBonusPoints(bonus)
        }
    }

    return (
        <View style={styles.gameboard}>
        <View style={styles.flex}>{row}</View>
        <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
        <Text style={styles.gameinfo}>{status}</Text>
        <Pressable style={styles.button}
            onPress={() => throwDices()}>
                <Text style={styles.buttonText}>Throw dices</Text>
        </Pressable>
        <Text style={styles.rules}>Total: {totalPoints}</Text>
        <Text style={styles.rules}>You are {bonusPoints} points away from bonus</Text>
        <View style={styles.dicepoints}>
        <Grid>{pointsRow}</Grid>
        </View>
        <View style={styles.dicepoints}>
        <Grid>{buttonRow}</Grid>
        </View>
        <Text style={styles.rules}>Player: {player}</Text>
    </View>
    )



}
