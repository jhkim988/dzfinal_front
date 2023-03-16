import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const wholeTextArray = [
    '이혜빈 990101 1234',
    '이혜빈 990102 2345',
    '이혜빈 990101 1111',
    '이혜빈 990101 2222',
    '이혜빈 990103 3333',
    '이혜빈 990103 4444',
    '이혜빈 990104 1111',
    '이혜빈 990104 8888',
    '이혜빈 990104 1111',
    '이혜빈 990107 7777',
    '이혜빈 990108 3333',
    '이혜빈 990111 6666',
    '이혜빈 991112 1230',
    '이혜빈 991219 0987',
]

const AutoCompleteForm = () => {
    //input에 들어간 값
    //input에 입력한 값을 포함한 단어를 dropdown 메뉴에 보여줌
    const [inputValue, setInputValue] = useState('')

    //입력된 input 값이 있는지 여부
    //입력된 input 값이 있으면 보여주고 없으면 보여주지않음
    const [isHaveInputValue, setIsHaveInputValue] = useState(false)

    //dropdown 에 보여줄 자동완성된 단어목록
    //array.map()
    const [dropDownList, setDropDownList] = useState(wholeTextArray)

    //선택한 자동완성된 단어 item의 index
    //dropDownList.map() 통해 dropdown이 나왔을 때 해당하는 index와 
    //dropDownItemIndex이 동일하면 배경색을 변경해서 선택되었음을 표시
    const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)

    const showDropDownList = () => {
        if (inputValue === '') {
            setIsHaveInputValue(false)
            setDropDownList([])
        } else {
            const choosenTextList = wholeTextArray.filter(textItem =>
                textItem.includes(inputValue)
            )
            setDropDownList(choosenTextList)
        }
    }

    const changeInputValue = event => {
        setInputValue(event.target.value)
        setIsHaveInputValue(true)
    }

    const clickDropDownItem = clickedItem => {
        setInputValue(clickedItem)

        //자동완성된 단어를 선택했기 때문에 dropdown 영역 숨김 위해 state false 변경
        setIsHaveInputValue(false)
    }

    const handleDropDownKey = event => {
        //input에 값이 있을때만 작동
        if (isHaveInputValue) {
            if (
                event.key === 'ArrowDown' && //아래버튼
                dropDownList.length - 1 > dropDownItemIndex
            ) {
                setDropDownItemIndex(dropDownItemIndex + 1)
            }

            if (event.key === 'ArrowUp' && dropDownItemIndex >= 0) //위버튼
                setDropDownItemIndex(dropDownItemIndex - 1)
            if (event.key === 'Enter' && dropDownItemIndex >= 0) { //enter 버튼(선택)
                clickDropDownItem(dropDownList[dropDownItemIndex])
                setDropDownItemIndex(-1)
            }
        }
    }

    useEffect(showDropDownList, [inputValue])

    return (
        <WholeBox>
            {/* <Title text='AutoComplete' /> */}
            <InputBox isHaveInputValue={isHaveInputValue}>
                <Input
                    type='text'
                    value={inputValue}
                    onChange={changeInputValue}
                    onKeyUp={handleDropDownKey}
                />
                <DeleteButton onClick={() => setInputValue('')}>&times;</DeleteButton>
            </InputBox>
            {isHaveInputValue && (
                <DropDownBox>
                    {dropDownList.length === 0 && (
                        <DropDownItem>입력하신 환자가 존재하지 않습니다.</DropDownItem>
                    )}
                    {dropDownList.map((dropDownItem, dropDownIndex) => {
                        return (
                            <DropDownItem
                                key={dropDownIndex}
                                onClick={() => clickDropDownItem(dropDownItem)}
                                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                                className={
                                    dropDownItemIndex === dropDownIndex ? 'selected' : ''
                                }
                            >
                                {dropDownItem}
                            </DropDownItem>
                        )
                    })}
                </DropDownBox>
            )}
        </WholeBox>
    )
}

const activeBorderRadius = '16px 16px 0 0'
const inactiveBorderRadius = '16px 16px 16px 16px'

const WholeBox = styled.div`
  padding: 10px;
`

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: ${props =>
        props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`

const DeleteButton = styled.div`
  cursor: pointer;
`

const DropDownBox = styled.ul`
  display: block;
  margin: 0 auto;
  padding: 8px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`

const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: lightgray;
  }
`

export default AutoCompleteForm