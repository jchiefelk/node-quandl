#include <node.h>
#include <iostream>
#include <string>

using namespace std;

namespace correlation {
		
		using v8::Function;
		using v8::FunctionCallbackInfo;
		using v8::Isolate;
		using v8::Local;
		using v8::Null;
		using v8::Object;
		using v8::String;
		using v8::Value;
		using v8::Array;


		void Correlation(const FunctionCallbackInfo<Value>&args){
			Isolate* isolate = args.GetIsolate();
			cout << "Correlation Test";
		    Local<Array> input = Local<Array>::Cast(args[0]);
		    int end_day_prices = input->Length();
		    cout << end_day_prices;
		    for(int x=0;x<end_day_prices;x++){
		    	 v8::Handle<Value> end_Value = input->Get(x);
		    	 float end_price = end_Value->NumberValue();
		    	 cout << end_price;
		    	 cout << "\n";
		    };
			//
			// we'll populate with the results
			Local<Array> result_list = Array::New(isolate);
			//
			args.GetReturnValue().Set(result_list);
		}



		void Init(Local<Object> exports, Local<Object> module) {
			NODE_SET_METHOD(module, "exports", Correlation);
	
		}


		NODE_MODULE(addon,Init);

}