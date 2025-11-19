import { useUser } from "../context/ContexUser.tsx";

const CardUserProfile = ({ setIsHovered }: { setIsHovered: (isHovered: boolean) => void }) => {
    const { user } = useUser() ?? {};

    return (
        <div className="relative w-full h-15 flex flex-row items-center justify-start gap-3 mt-3 rounded border border-black bg-gray-800 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="flex items-center justify-center">
                <div className="w-15"></div>
                <img className="absolute -left-3.5 w-20 rounded-full select-none"
                    src={`http://localhost:5000/${user?.userImageUrl}`}
                    alt={user?.username} />
            </div>
            <div className="size-full flex flex-col justify-center items-start gap-0.5 pl-1 overflow-hidden">
                <p className="text-sm">{user?.name}</p>
                <p className="text-xs">@{user?.username}</p>
            </div>
        </div>
    )
}

export default CardUserProfile;