#include <node.h>
#include <iostream>
#include <string>
using namespace std;

namespace callback {

		using v8::Function;
		using v8::FunctionCallbackInfo;
		using v8::Isolate;
		using v8::Local;
		using v8::Null;
		using v8::Object;
		using v8::String;
		using v8::Value;
		using v8::Array;

	void RunCallback(const FunctionCallbackInfo<Value>& args){
		  cout << args.Length();

		  Isolate* isolate = args.GetIsolate();
		  Local<Object> obj = Object::New(isolate);
		 // obj->Set(String::NewFromUtf8(isolate, "msg"), args[0]->ToString());
		  // Local<Array> array = Array::Cast(args[0]);
		  //cout << array->Length();		 

		 // args.GetReturnValue().Set(array);
	}

	void Init(Local<Object> exports, Local<Object> module) {
		NODE_SET_METHOD(module, "exports", RunCallback);
	}

	NODE_MODULE(addon,Init);

} // namespace demo