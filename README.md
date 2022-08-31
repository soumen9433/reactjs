# BaseProjectReact
Base project to start react application

For the current authorization implemented, you can login and check using below credentials
email       :   rk@gmail.com
password    :   Rushil@151

# For ESLINT to work properly on vscode, follow below mention step
1) Install the extention of eslit in vscode and restart it
2) Go to settings and search for eslint extention
    i) Check "Eslint: Always Show Status"
    ii) Eslint › Code Actions On Save: Rules => Edit settings.json
        a) Verify/Add below mention json
            "eslint.format.enable": true,
            "editor.codeActionsOnSave": {
                "source.fixAll.eslint": true
            }
    iii) Check "Eslint › Format: Enable"
3) Restart the application if needed

This will enable eslint and we will get error/suggestion/auto-fix from eslint. We could add more rules to .eslintrc.json file on root directory if needed

# To bypass login for testing
1) Login.tsx
    const onSubmit function
        remove the login part and redirect to window.location.href = RouteEnum.Root;
2) On the protectedRoute.tsx, pass static value const isAuthenticated = true;
3) pass identity in MainNav.tsx : const currentUser = "rushil";


# Todo
protectedRoute.tsx file have one todo item. This is a static condition for demo purpose, so change it in actual project
