# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


to use git cmds
first initialize with ```git init``` cmd
then use ```add .```  cmd to add all updated files 
then commit it ```git commit"..."```
and the last to push the code in github use ```git push origin main``` cmd 


to pass the data in cards you need some json and any type of data here I have a array of data which is in app.jsx which is main file the parent always remember data is flow from above to down like parents to child.

here my array name is student and has 10 arrays of data, name, roll_number and img ok 

use ```map`` for selecting all the data given in the array you can also use 
```forEach``` and if you want to see the array of data just console in like 
```student.map(function (elem) {
  console.log(`Name: ${elem.name}, Roll Number: ${elem.roll_number}, Fee Paid: ${elem.fee_paid}`);
}); ``` 

write this in return section used for displaying a list of items 
``` <div className ="flex flex-wrap justify-center gap-4 p-4 bg-gray-400 ">
        {student.map((elem) => (
          <Cards
            key={elem.roll_number}
            student={elem}
          />))}
      </div>
```

```flex: This is the most important part. It turns the div into a "flexbox container," which tells the browser to arrange its children (the cards) in a row (horizontally) by default.```

```flex-wrap: If there are too many cards to fit in one row, this class tells them to "wrap" to the next line.```

```justify-center: This centers the entire group of cards horizontally in the middle of the div.```

```gap-4: This adds a consistent 4-unit (e.g., 16px) space or "gap" between each card, so they don't touch.```

```p-4: This adds 4 units of "padding" inside the container, giving a nice border of space around the whole group of cards.```

```bg-gray-400: This sets the background color of the container to a medium gray.```



```{syudent.map(...)}``` this is part where you create cards dynamically for your data.


student is the name of your array 

```.map()``` is a standard javascript array function, it loops the every single item in your array one by one

```(elem)=>(...)``` this is a array function for each loop the current item from the student array is put into the variable elem. The code inside the ( ... ) is what gets run for that item.


