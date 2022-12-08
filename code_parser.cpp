#include<string>
#include<deque>
#include<iostream>
#include<map>




/**
 * @brief detect if a type is mentioned before the varable name
 * 
 * @return error 
 */

/**
 * @brief detect if varable type is valid
 * 
 * 
 * 
 * 
 * 
 * @return int 
 */




bool valid_varable_name(std::string varable_name){

    //prT = primitiveTypes || nT nestedTypes ->  varableName -> ( end;
   // || continue(function)) -> 
   //  function body { -> prT(branches to total number of variables in function body) || nestedTypes -> varableName-> ; } -> ;
    //

    std::map<char, char> dependencyChain;





    for (char letter : varable_name)
    {
    }
}




/**
 * @brief 
 * 
 * @return int 
 */






int main(){
    std::string str = "int val = 5; int function(arg){}";

    int i = 0;
    
    while(i < str.size()){

        i++;
    };
}
