import { useUser } from "../context/ContexUser.tsx";

const CardUserProfile = ({ setIsHovered }: { setIsHovered: (isHovered: boolean) => void }) => {
    const { user } = useUser() ?? {};

    return (
        <div className="relative w-full flex flex-row items-center justify-start gap-3 rounded border border-black bg-gray-800 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="flex items-center justify-center">
                <div className="w-15"></div>
                <img className="absolute -left-3.5 w-20 rounded-full select-none" src={`http://localhost:5000/${user?.userImageUrl}`} alt="UserIcon" />
            </div>
            <div className="flex flex-col justify-start items-start gap-2 p-1 overflow-hidden">
                <p className="text-xl">{user?.name}</p>
                <p className="text-sm">@{user?.username}</p>
            </div>
        </div>
    )
}

export default CardUserProfile;