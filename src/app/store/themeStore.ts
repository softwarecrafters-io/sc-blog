import {Theme} from "@/app/components/client/theme/themeSwicher";
import {Subject} from "rxjs";

export class ThemeStore{
    private currentTheme: Theme = 'light';
    private readonly themeSubject: Subject<Theme> = new Subject<Theme>();

    updateTheme(theme: Theme){
        this.currentTheme = theme;
        this.themeSubject.next(theme);
    }

    getThemeSubject(): Subject<Theme>{
        return this.themeSubject;
    }
}
