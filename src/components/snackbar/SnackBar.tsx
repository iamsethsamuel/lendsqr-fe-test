import Button from "../button/Button";

type SnackBarType = {
    open: boolean;
    onClose: () => void;
    message: string;
};
function SnackBar({ open, onClose, message }: SnackBarType) {

    return open ? (
        <div id="snackbar" className="fixed b-1 r-0 l-0 flex center   w-100">
            <div
                className="bg-black shadow-gray br-1 white flex space-between"
                style={{ paddingInline: "2rem", paddingBlock: "10px", gap: "2em" }}>
                {message}
                <Button variant="text" className="" onClick={onClose}>
                    X
                </Button>
            </div>
        </div>
    ) : (
        <></>
    );
}

export default SnackBar;
