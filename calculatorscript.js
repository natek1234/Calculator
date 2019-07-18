function calculate()
{
	var inp = document.getElementById("input").value;
	var l = inp.split("");
	var tracker = 0;
	var num1 = "";
	var operator = "";
	var step = 1;
	var stack = [];

	while(tracker<l.length)
	{
		if(l[tracker] == '+' || l[tracker] == '-' || l[tracker] == '*' || l[tracker] == '^' || l[tracker] == '%' || l[tracker] == '(' || l[tracker] == ')')
		{
			if(num1 != ""){
				stack.push(parseInt(num1,10));
			}
			operator = l[tracker];
			if(operator != ""){
				stack.push(operator);
			}
			operator = "";
			num1 = "";
		}
		else if(l[tracker] == '/')
		{
			if(tracker+1<l.length)
			{
				if(l[tracker+1] == '/')
				{
					if(num1 != ""){
						stack.push(parseInt(num1,10));
					}
					operator = '//';
					stack.push(operator);
					operator = "";
					num1 = "";
					tracker = tracker+2;
					continue;
				}
			}
			if(num1 != ""){
				stack.push(parseInt(num1,10));
			}
			operator = '/';
			stack.push(operator);
			operator = "";
			num1 = "";
		}
		else if(operator == "")
		{
			num1 = num1 + l[tracker];
		}
		tracker = tracker + 1;	
	}
	if(num1 != ""){
		stack.push(parseInt(num1,10));
	}




	stack = calc(stack, 0);

	document.getElementById("output").innerHTML = stack;
}

function calc(stack)
{
	var operator1 = '';
	var operator2 = '';
	var operator3 = '';
	var i;
	var level = 0;
	var found = 1;
	var stack2 = [];
	var balance = 0;
	var n;
	var newStack = [];
	var closed = 0;

	while(level < 3)
	{
		found = 1;
		newStack = [];
		if(level == 0)
		{
			operator1 = '^';
			operator2 = '(';
			operator3 = ')';
		}
		if(level == 1)
		{
			operator1 = '*';
			operator2 = '/';
			operator3 = '//';
		}
		else if(level == 2)
		{
			operator1 = '+';
			operator2 = '-';
		}
		for(i = 0;i<stack.length;i++)
		{
			if(stack[i] == operator1)
			{
				stack = stack.slice(0,i-1).concat([evaluate(stack[i-1], stack[i+1], operator1)]).concat(stack.slice(i+2,stack.length));
				document.getElementById("test2").innerHTML = stack;				
				found = 0;
				break;
			}
			else if(stack[i] == operator2 && level != 0)
			{
				document.getElementById("test").innerHTML = stack;
				stack = stack.slice(0,i-1).concat([evaluate(stack[i-1], stack[i+1], operator2)]).concat(stack.slice(i+2,stack.length));
				found = 0;
				break;
			}

			if(level == 1)
			{
				if(stack[i] == operator3)
				{

					stack = stack.slice(0,i-1).concat([evaluate(stack[i-1], stack[i+1], operator3)]).concat(stack.slice(i+2,stack.length));
					found = 0;
				}
			}

			if(level == 0)
			{
				if(stack[i] == operator2)
				{
					balance++;
					for(n=i+1;n<stack.length;n++)
					{
						if(stack[n] == operator2)
						{
							balance++;
						}
						else if(stack[n] == operator3)
						{
							balance--;
						}
						else
						{
							stack2.push(stack[n]);
						}
						if(balance == 0)
						{
							closed = n;
							break;
						}
					}
					newStack = calc(stack2);
					stack2 = [];
					if(closed+1<stack.length)
					{
						stack = stack.slice(0,i).concat([newStack]).concat(stack.slice(closed+1,stack.length));
						found = 0;
					}
					else
					{
						stack = stack.slice(0,i).concat([newStack]);
						found = 0;
					}
				}				
				else if(stack[i] == operator3)
				{

				}
			}
		}

		if(level == 2)
		{

		}
		if(found == 1)
		{
			level++;
		}
	}

	return [stack];
}

function evaluate(num1,num2,operator){



	if(operator == '+')
	{
		return (Number(num1) + Number(num2));
	}
	else if(operator == '-')
	{
		return (num1 - num2);
	}
	else if(operator == '*')
	{
		return (num1 * num2);
	}
	else if(operator == '/')
	{
		return (num1 / num2);
	}
	else if(operator == '//')
	{
		return floor(num1,num2);
	}
	else if(operator == '^')
	{
		return exp(num1,num2);
	}
	else if(operator == '%')
	{
		return (num1 % num2);
	}
}

input.addEventListener("keyup", function(event) {
if (event.keyCode === 13) {
	event.preventDefault();
 	document.getElementById("enter").click();
	}
});

function exp(num,exponent){
	var result = 1;
	var i;
	for(i = 0; i<exponent; i++)
	{
		result = result*num;
	}
	return result;
}

function floor(dividend,divisor)
{
	quotient = 0;
	temp = divisor;
	while(temp<dividend)
	{
		temp = temp + divisor;
		quotient = quotient+1;
	}
	return(quotient);
}