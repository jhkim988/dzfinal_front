
const UserInfoSection = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo);
    return <>
        {`${userInfo.employee_name}/${userInfo.authority}`}
    </>
}

export default UserInfoSection;