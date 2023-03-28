// const reducer = (state, action) => {
//   switch (action.type) {
//     case "arrowDown":
//       return {
//         ...state,
//         selectedIndex:
//           state.selectedIndex < state.searchList.length - 1
//             ? state.selectedIndex + 1
//             : state.selectedIndex,
//       };
//     case "arrowUp":
//       return {
//         ...state,
//         selectedIndex:
//           state.selectedIndex > 0
//             ? state.selectedIndex - 1
//             : state.selectedIndex,
//       };
//     case "enter":
//       return {
//         ...state,
//         input: "",
//         selectedIndex: -1,
//         searchList: [],
//       };
//     default:
//       return state;
//   }
// };

// const [state, dispatch] = useReducer(reducer, {
//   input: "",
//   selectedIndex: -1,
//   searchList: [],
// });

// const handleKeyDown = (e) => {
//   const scrollRef = searchListRef.current;

//   switch (e.key) {
//     case "ArrowDown":
//       dispatch({ type: "arrowDown" });
//       break;
//     case "ArrowUp":
//       dispatch({ type: "arrowUp" });
//       break;
//     case "Enter":
//       if (state.selectedIndex >= 0) {
//         handleDiagnosisAdd(state.searchList[state.selectedIndex]);
//       }
//       dispatch({ type: "enter" });
//       scrollRef.scrollTop = 0;
//       hideSearchList();
//       resetInputValue();
//       break;
//     default:
//       break;
//   }
// };
