import {FC, MouseEventHandler} from "react";
import Button from "@mui/material/Button";
import "./ButtonComponent.css"
interface ButtonProps {
    content:string;
    classname:string;
    sx:{ pl: number, pr: number};
    onClick?:MouseEventHandler
}

const ButtonComponent: FC<ButtonProps> = ({classname, sx,content, onClick}) => {
    return (
        <>
            <Button variant="contained" className={classname} sx={sx} onClick={onClick}>
                {content}
            </Button>
        </>
    )
}

export default ButtonComponent;