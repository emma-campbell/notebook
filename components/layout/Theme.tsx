import { useTheme } from "@/state/theme";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export const ThemePicker = () => {
    const { theme, setTheme } = useTheme();
    
    return (
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            { theme === "light" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" /> }
        </Button>
    )
}