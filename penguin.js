// the mean of the quizes
var getGradeQuiz = function(quiz)
    {
        return quiz.grade
    }
var getPenguinQuiz = function(penguin)
    {
        var QuizGrades = penguin.quizes.map(getGradeQuiz)
        var QuizesMean = d3.mean(QuizGrades)
        return QuizesMean.toFixed(2)
    }

//the mean of the homeworks
var getGradeHomework = function(homework)
    {
        return homework.grade
    }
var getPenguinHomework = function(penguin)
    {
        var HomeworkGrades = penguin.homework.map(getGradeHomework)
        var HomeworkMean = d3.mean(HomeworkGrades)
        return HomeworkMean.toFixed(2)
    }


//the mean of the tests
var getGradeTest = function(test)
    {
        return test.grade
    }
var getPenguinTest = function(penguin)
    {
        var TestGrades = penguin.test.map(getGradeTest)
        var TestMean = d3.mean(TestGrades)
        return TestMean.toFixed(2)
    }

//grade on the final
var getFinalGrade = function(final)
    {
        return final.grade
    }
var getPenguinFinal = function(penguin)
    {
        var FinalGrades = penguin.final.map(getFinalGrade)
        return FinalGrades
    }
//Overall Grade

var getGrade = function(penguin)
    { 
        var FinalGrades = penguin.final.map(getFinalGrade)
        var TestGrades = penguin.test.map(getGradeTest)
        var TestMean = d3.mean(TestGrades)
        var QuizGrades = penguin.quizes.map(getGradeQuiz)
        var QuizesMean = d3.mean(QuizGrades)
        var HomeworkGrades = penguin.homework.map(getGradeHomework)
        var HomeworkMean = d3.mean(HomeworkGrades)
        var totalGrade = FinalGrades*.35 + TestMean*.30 + QuizesMean*.20 + HomeworkMean*.15
        return totalGrade.toFixed(2)
    }

//removes the rows from the table
var clearTable = function()
    {
        d3.selectAll("#penguintable tr")
            .remove();
    }


var classDataPromise = d3.json("classData.json")
    


classDataPromise.then(function(classData)
                      {
                        console.log("worked",classData); displayTable(classData);
                        initHeaders(classData);
                      });
                      (function(err){console.log("failed", err)})



var displayTable = function(classData)
{ var header = d3.select("#penguintable")
    .selectAll("th")
    .data(["Penguin", "Mean Quiz Grade", "Mean Homework Grade", "Mean Test Grade", "Grade on Final","Overall Grade"])
    .enter()
    .append("th")
    .text (function(d){return d})
   
    
    var rows = d3.select("#penguintable")
   .selectAll("tr")
   .data(classData)
   .enter()
   .append("tr")
    rows.append("td")
        .append("img")
        .attr("src", function(classData)
             {
                return "imgs/" + classData.picture
             })
    rows.append("td")
        .text(getPenguinQuiz)
    rows.append("td")
        .text(getPenguinHomework)
    rows.append("td")
        .text(getPenguinTest)
    rows.append("td")
        .text(getPenguinFinal)
    rows.append("td")
        .text(getGrade)

}

var initHeaders = function(classData)
{
    d3.select("#MeanQuizGrade")
    .on("click", function()
    { console.log("clicked");
        classData.sort(function(a,b)
            { 
                var ainc = getPenguinQuiz(a);
                var binc = getPenguinQuiz(b);
                if (ainc < binc) {return -1}
                else if (ainc > binc) {return 1}
                else {return 0;}
            
            });
            clearTable();
            displayTable(classData);
        
    });

     d3.select("#MeanHomeworkGrade")
    .on("click", function()
    { console.log("clicked");
        classData.sort(function(a,b)
            { 
                var ainc = getPenguinHomework(a);
                var binc = getPenguinHomework(b);
                if (ainc < binc) {return -1}
                else if (ainc > binc) {return 1}
                else {return 0;}
            
            });
            clearTable();
            displayTable(classData);
        
    });

     d3.select("#MeanTestGrade")
    .on("click", function()
    { console.log("clicked");
        classData.sort(function(a,b)
            { 
                var ainc = getPenguinTest(a);
                var binc = getPenguinTest(b);
                if (ainc < binc) {return -1}
                else if (ainc > binc) {return 1}
                else {return 0;}
            
            });
            clearTable();
            displayTable(classData);
        
    });

     d3.select("#GradeonFinal")
    .on("click", function()
    { console.log("clicked");
        classData.sort(function(a,b)
            { 
                var ainc = getPenguinFinal(a);
                var binc = getPenguinFinal(b);
                if (ainc < binc) {return -1}
                else if (ainc > binc) {return 1}
                else {return 0;}
            
            });
            clearTable();
            displayTable(classData);
        
    });
    
    d3.select("#OverallGrade")
    .on("click", function()
    { console.log("clicked");
        classData.sort(function(a,b)
            { 
                var ainc = getGrade(a);
                var binc = getGrade(b);
                if (ainc < binc) {return -1}
                else if (ainc > binc) {return 1}
                else {return 0;}
            
            });
            clearTable();
            displayTable(classData);
        
    });
}


