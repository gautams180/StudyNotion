import ChangePhoto from "./ChangePhoto";

export const Settings = () => {
    return (
        <div className='w-3/12 lg:w-9/12 mx-auto flex flex-col gap-10'>
            <h1 className="text-richblack-5 text-3xl font-medium">Edit Profile</h1>
            <ChangePhoto />
        </div>
    )
}