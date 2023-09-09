import useCurrentUser from "@/hooks/useCurrentUser"


const UserImage = () => {

    const { data } = useCurrentUser();

    return(
        <img src={data.image ? "/images/default-red.png" : data.image} alt="pforile image" />
    )
};

export default UserImage;