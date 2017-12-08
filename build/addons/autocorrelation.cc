#include <node.h>
#include <iostream>
#include <string>
#include <unistd.h>
#include "uv.h"

using namespace std;

namespace autocorrelation {

		using v8::Function;
		using v8::FunctionCallbackInfo;
		using v8::FunctionTemplate;
		using v8::Exception;
		using v8::Isolate;
		using v8::Local;
		using v8::Null;
		using v8::Object;
		using v8::String;
		using v8::Value;
		using v8::Array;
		using v8::Handle;
		using v8::Number;
		using v8::Persistent;
		using v8::Context;

		struct Work {
		  uv_work_t  request;
		  Persistent<Function> callback;
		  float autocorrelation[1000000];
		  float IntradayEnd[1000000];
		  int length;
		};

		static void WorkAsync(uv_work_t *req)
		{
		    Work *work = static_cast<Work *>(req->data);
		    // this is the worker thread, lets build up the results
		    // allocated results from the heap because we'll need
		    // to access in the event loop later to send back
		    // Compute Autocorrelation
		    int maxTau = work->length;
		    // Forward autocorrelation
	
		    for(int tau=0; tau<maxTau;tau++){
		    	work->autocorrelation[tau] = 0;
		    	for(int t = 0;t<maxTau-tau;t++){
		    		//cout << maxTau+tau << "\n";
		    		work->autocorrelation[tau] += work->IntradayEnd[t]*work->IntradayEnd[t+tau];	
		    	};
		    	/**
		    	work->autocorrelation[maxTau+tau]/=((maxTau-tau)); // Normalize Autocorrelation Function
				work->autocorrelation[tau] = 0.0;	
		    	for(int t = maxTau-tau; t>=0;t--){
		    	//	cout << maxTau-tau << "\n";
		    		work->autocorrelation[tau] += work->IntradayEnd[t]*work->IntradayEnd[t-tau];	
		    	};
		    	 work->autocorrelation[tau]/=((maxTau-tau));
		    	**/ 
		    };
		    //
		    float NormFactor = work->autocorrelation[0];
		    for(int i=0;i<maxTau;i++){
		   		work->autocorrelation[i]/=NormFactor;
			};
		}

		// called by libuv in event loop when async function completes
		static void WorkAsyncComplete(uv_work_t *req,int status)
		{
		    Isolate* isolate = Isolate::GetCurrent();
		    v8::HandleScope handleScope(isolate); // Required for Node 4.x
		    Work *work = static_cast<Work *>(req->data);
  			Local<Array> result_list = Array::New(isolate);
			for(int x=0; x < work->length; x++){
				Local<Number> returnval = Number::New(isolate, work->autocorrelation[x]);
				result_list->Set(x, returnval);
			};
			//
   			Handle<Value> argv[] = { result_list };
    		// execute the callback
    		Local<Function>::New(isolate, work->callback)->Call(isolate->GetCurrentContext()->Global(), 1, argv);
		    // Free up the persistent function callback
	    	work->callback.Reset();
		    delete work;
		}


		void Autocorrelation(const v8::FunctionCallbackInfo<v8::Value>&args){
			Isolate* isolate = args.GetIsolate();
			// kick of the worker thread
		    //
		    // Worker Thread
		    //
		    Work *work = new Work;
    		work->request.data = work;
    		// 
		    // Local<Object> obj = Object::New(isolate);
  			Local<Context> context = isolate->GetCurrentContext();
  			Local<Object> obj = args[0]->ToObject(context).ToLocalChecked();
  			Handle<Array> array =  Handle<Array>::Cast(obj->Get(String::NewFromUtf8(isolate,"close")));
		
			work->length = array->Length();
			for(int x=0;x<work->length;x++){
			      v8::Local<Value> val = array->Get(x); 			 
			      work->IntradayEnd[x] = val->NumberValue();
			};
		    // store the callback from JS in the work package so we can 
		    // invoke it later
		    Local<Function> callback = Local<Function>::Cast(args[1]);
		    work->callback.Reset(isolate, callback);
		    // kick of the worker thread
    	 	uv_queue_work(uv_default_loop(),&work->request, WorkAsync, WorkAsyncComplete);
    		args.GetReturnValue().Set(Undefined(isolate));
		}

		void Init(Local<Object> exports, Local<Object> module) {
			NODE_SET_METHOD(module, "exports", Autocorrelation);
		}


		NODE_MODULE(autocorrelation,Init);
}