package com.example.readerandroidapp;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;
import androidx.annotation.NonNull;
import java.util.List;

public class ClientListAdapter extends ArrayAdapter<String> {
    private final Context mContext;
    private final int id;
    private final List<String> items;

    public ClientListAdapter(Context context, int textViewResourceId, List<String> list) {
        super(context, textViewResourceId, list);
        mContext = context;
        id = textViewResourceId;
        items = list;
    }

    @NonNull
    @Override
    public View getView(int position, View view, @NonNull ViewGroup parent) {
        if (view == null) {
            LayoutInflater vi = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            view = vi.inflate(id, null);
        }

        TextView text = view.findViewById(R.id.textViewClientAddress);
        if (items.get(position) != null) {
            text.setText(items.get(position));
        }

        return view;
    }

}