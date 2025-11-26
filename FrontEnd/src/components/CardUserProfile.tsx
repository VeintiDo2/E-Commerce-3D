import { useUser } from "../context/ContexUser.tsx";
import ButtonModel from "./Reusable/ButtonModel.tsx";

const CardUserProfile = ({ setIsHovered }: { setIsHovered: (isHovered: boolean) => void }) => {
    const { user } = useUser() ?? {};

    return (
        <article className="relative w-full h-15 flex flex-row items-center justify-start gap-3 mt-3 rounded border border-black bg-gray-800 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="flex items-center justify-center">
                <div className="w-15"></div>
                <img className="absolute -left-3.5 w-20 rounded-full select-none"
                    src={`http://localhost:5000/${user?.userImageUrl}`}
                    alt={user?.username} />
            </div>
            <section className="size-full flex flex-row gap-0.5 pl-1 overflow-hidden">
                <div className="flex flex-col grow items-start">
                    <p className="text-sm grow">{user?.name}</p>
                    <p className="text-xs grow">@{user?.username}</p>
                </div>

                <div className="flex flex-col items-center justify-center pr-1">
                    <ButtonModel 
                        type="onlyIconSmall"
                        iconName="settings"
                        animateSpin={true}
                    />
                </div>
            </section>
        </article>
    )
}

export default CardUserProfile;